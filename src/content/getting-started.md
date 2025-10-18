---
title: Getting started
description: Quick start guide to clone, build and run the Mach bootstrap toolchain and sample CLI.
---

# Getting started

Welcome — this page helps you get the Mach bootstrap toolchain built and the example CLI running. The instructions assume a Unix-like environment (Linux/macOS) and a POSIX toolchain.

Quick checklist

- Clang/LLVM 16+ (clang, lld, llvm-config)
- make, cc, ar
- 64-bit Linux for the current bootstrap target (or adapt as needed)

Why these repositories?

The project is split into three repositories in the bootstrap workflow:

- **mach-c** — a small C-based bootstrap compiler that emits object files used to link the sample CLI.
- **mach-std** — the standard library archive used by the runtime and by programs built with Mach.
- **mach** — this repository (future self-hosted compiler and CLI project).

## Quickstart

Run these commands to clone and build the components. Substitute your preferred path for `~/dev/src/github.com/octalide`.

```bash
mkdir -p ~/dev/src/github.com/octalide
cd ~/dev/src/github.com/octalide
git clone https://github.com/octalide/mach-c.git
git clone https://github.com/octalide/mach-std.git
git clone https://github.com/octalide/mach.git
```

### Build the bootstrap compiler (`mach-c`)

```bash
cd mach-c
make   # produces bin/cmach
```

Note: the build expects Clang/LLD on your PATH. If you use a custom toolchain, set `CC`/`CXX` environment variables or edit the `Makefile`.

### Build the standard library (`mach-std`)

```bash
cd ../mach-std
make   # produces out/lib/libmachstd.a
```

### Build and run the sample CLI (`mach`)

```bash
cd ../mach
make   # builds and links out/bin/mach
make run
```

The `Makefile` invokes `../mach-c/bin/cmach build ... --emit-obj --no-link` and then links with `cc` plus `out/lib/libmachstd.a`.

## Troubleshooting

- "clang: command not found" — install Clang/LLVM (16+). On Debian/Ubuntu: `sudo apt install clang lld`.
- Link failures — ensure `cc` (system C compiler) and `ar` are available and in PATH.
- Permission errors — check file permissions and that your user can write to the build directories.

## Next steps

- Run `./out/bin/mach help` to list available commands.
- Modify `src/commands.mach` in the `mach` repo to add CLI subcommands.
- Track progress toward the self-hosted compiler in this repository — the goal is to replace the C bootstrap with a Mach-built compiler over time.
