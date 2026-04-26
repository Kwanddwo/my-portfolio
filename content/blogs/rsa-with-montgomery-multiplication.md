---
title: "RSA with Montgomery Multiplication"
description: "Implementing faster modular exponentiation for RSA in Python"
date: "2026-04-26"
order: 1
---

## Introduction

RSA relies heavily on modular exponentiation. Given a modulus $N = pq$ (with $p$ and $q$ prime), encryption and decryption are:

$$
c \equiv m^e \pmod{N}, \qquad m \equiv c^d \pmod{N}
$$

The core operation is therefore computing $x^k \bmod N$ efficiently.

### Quick RSA key-generation recap

1. Choose two large primes $p$ and $q$.
2. Compute $N = pq$.
3. Compute Euler's totient: $\varphi(N) = (p-1)(q-1)$.
4. Choose $e$ such that $1 < e < \varphi(N)$ and $\gcd(e, \varphi(N)) = 1$.
5. Compute $d \equiv e^{-1} \pmod{\varphi(N)}$.

> **Security note:** this article uses textbook RSA for learning. Real-world RSA requires secure padding (e.g. OAEP) and constant-time implementations.

## Baseline: binary modular exponentiation

The standard optimization over naive exponentiation is square-and-multiply:

```python
def exp_mod(x: int, exp: int, mod: int) -> int:
    x %= mod
    if x == 0:
        return 0

    result = 1
    while exp > 0:
        if exp & 1:
            result = (result * x) % mod
        x = (x * x) % mod
        exp >>= 1
    return result
```

This is already much faster than computing $x^k$ first and reducing at the end.

## Why Montgomery multiplication?

Modular multiplication repeatedly performs reductions modulo $N$. Montgomery's idea is to move values into a different representation where reductions avoid expensive generic division and instead use operations based on a power-of-two radix.

Choose a radix:

$$
R = 2^k, \quad R > N, \quad \gcd(R, N) = 1
$$

For odd RSA moduli $N$, choosing $R$ as a power of two automatically gives $\gcd(R, N)=1$.

## Montgomery domain

A value $x$ is represented in Montgomery form as:

$$
\bar{x} = xR \bmod N
$$

Multiplying two Montgomery values gives:

![](/mont1.png)

To stay in Montgomery form we need to divide one factor of $R$, i.e. compute:

![](/mont2.png)

So Montgomery multiplication is "multiply, then apply Montgomery reduction".

## REDC: Montgomery reduction

Montgomery reduction (often written `REDC`) computes:

$$
\operatorname{REDC}(T) = T R^{-1} \bmod N
$$

assuming $0 \le T < NR$.

Precompute:

$$
N' \equiv -N^{-1} \pmod{R}
$$

Then:

1. $m = (T \bmod R)N' \bmod R$
2. $t = (T + mN)/R$
3. if $t \ge N$, return $t - N$, else return $t$

Because $R=2^k$:

- $T \bmod R$ becomes `T & (R - 1)`
- division by $R$ becomes `>> k`

Pseudocode:

```python
def redc(T: int, N: int, N_prime: int, k: int) -> int:
    mask = R - 1

    m = ((T & mask) * N_prime) & mask
    t = (T + m * N) >> k

    if t >= N:
        t -= N
    return t
```

The full explanation for how $$REDC$$ works can be found [here](https://en.wikipedia.org/wiki/Montgomery_modular_multiplication)

## Implementation details

To use Montgomery multiplication efficiently, we precompute constants once:

$$
k = \lceil \log_2 N \rceil, \quad R = 2^k, \quad R^2 \bmod N, \quad N' = -N^{-1} \bmod R
$$

Python implementation:

```python
def mont_reduce(T, N=N, nprime=nprime, k=k, mask=mask):
    m = ((T & mask) * nprime) & mask
    t = (T + m * N) >> k
    if t >= N:
        t -= N
    return t


def mont_mul(a, b):
    return mont_reduce(a * b)


def to_mont(x):
    # x * R mod N, implemented as MonPro(x, R^2)
    return mont_mul(x % N, R2)


def from_mont(x):
    # x * R^{-1} mod N
    return mont_reduce(x)


def exp_mont(x, exp):
    x %= N
    if x == 0:
        return 0

    acc = to_mont(1)
    base = to_mont(x)

    while exp:
        if exp & 1:
            acc = mont_mul(acc, base)
        base = mont_mul(base, base)
        exp >>= 1

    return from_mont(acc)
```

## Benchmarking notes

In pure Python, this version can be slower than expected because interpreter overhead may dominate the arithmetic gains.

For fair benchmarks we need to measure in lower-level languages (C/C++/Rust) where Montgomery arithmetic usually shines

You can find the full implementation and benchmark scripts in [this repository](https://github.com/Kwanddwo/RSA-with-Montgomery-Multiplication).

## Sources

- https://en.wikipedia.org/wiki/Montgomery_modular_multiplication
