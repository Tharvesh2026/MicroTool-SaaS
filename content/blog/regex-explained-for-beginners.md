---
title: "Regex Explained for Beginners"
description: "A beginner-friendly walkthrough of regular expressions — the core building blocks and how to start testing your own patterns."
date: "2025-01-16"
author: "CreatorDevTools Team"
---

Regular expressions (regex) describe patterns in text. They look intimidating at first, but a handful of building blocks cover the vast majority of everyday use cases: validating an email field, extracting phone numbers, or finding every hex color in a stylesheet.

## The building blocks

**Literal characters** match themselves. The pattern `cat` matches the text "cat" wherever it appears.

**Character classes** match one character from a set. `[abc]` matches "a", "b", or "c". A shorthand like `\d` matches any digit, `\w` matches any word character (letters, digits, underscore), and `\s` matches whitespace.

**Quantifiers** control how many times something can repeat:
- `*` — zero or more
- `+` — one or more
- `?` — zero or one (optional)
- `{3}` — exactly three times
- `{2,5}` — between two and five times

**Anchors** pin a match to a position rather than matching characters. `^` matches the start of a string (or line, with the multiline flag), and `$` matches the end.

**Groups** in parentheses `( )` let you capture part of a match for later use, or apply a quantifier to a whole sequence at once.

## A worked example

Say you want to match a simple hex color code like `#FF0000`. You'd need:

```
#[0-9a-fA-F]{6}
```

This reads as: a literal `#`, followed by exactly six characters that are digits or letters A–F (in either case).

## Flags change how matching works

Flags modify the overall behavior of a pattern:

- `i` — case-insensitive matching
- `g` — find all matches, not just the first
- `m` — treat `^` and `$` as matching the start/end of each line, not just the whole string

## Testing your patterns

The fastest way to learn regex is to experiment against real text and see immediately what matches. Our [Regex Tester](/tools/regex-tester) highlights every match in your test string, lists capture groups, and includes ready-made examples for common patterns like emails and URLs — all processed locally in your browser as you type.
