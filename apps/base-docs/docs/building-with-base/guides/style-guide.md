---
title: Style Guide for Tutorials and Base Camp
description: Learn how to adhere to the style guide for tutorials and Base Camp content.
keywords: [tutorial, guide, style guide]
hide_table_of_contents: false
---

This document is a guide for writing content for within Base Camp, and tutorials under the `Guides` of the docs site. While not a rigid set of rules, all content within the above sections should adhere to it as much as possible.

These guidelines are **not** for traditional documentation.

## General Guidelines for Tutorials and Base Camp Content

- Aim for a Flesch-Kincaid readability score between 70 and 80 (8th grade). Our material is complex and our pace is high. You are not helping the learner by saying **posthaste** when **fast** will do
- Write [inclusively] and for an international audience
- Write and produce video with a collaborative point of view. Generally, you should speak to the reader and instruct them with **you**, saving **we** for the point of the view of the authors
  - **Good:** Next, you'll need to add a function to fetch the data from the server.
  - **Bad:**: Next, we'll need to add a function to fetch the data from the server.
  - **Good:** You'll want to be careful that the API call doesn't timeout. We've found that under 5 seconds is safe, but were unable to find a documented source to confirm.
- Change is constant. Write about how things are **now**. When they change, update them!
- It's not enough to list simply **what** to do to accomplish a task. Explain **why** and teach **how** to find this out. Link to docs and primary sources as often as possible. If it's not documented, document it!
- With great care and professionalism, include humor and a light-hearted attitude in your work
- Do not plagiarize or use unauthorized images. Cite sources when required, and use media only as allowed
  - This does not mean that you are required to cite a source for all thoughts or ideas
- The [Oxford Comma] adds clarity. We use it
- Writers may chose to use 1 or 2 spaces after a period as both are rendered the same in html. Enabling format-on save is recommended, which will shorten them to 1 space
- Lists
  - We use dashes for lists, which Docusaurus converts to round bullets
    Lists do not have a period at the end of the only, or last sentence
  - Use numbered lists when items are a part of an ordered series. Use the number **1** for each item. Doing so will render the correct number automatically and ensure that changes to the list don't break the numbering
- Use an external tool to find and correct spelling and grammar errors before submitting a PR. Code editor plugins are helpful, but generally deficient
- Types of emphasis:
  - **Bold text** is used for emphasis. It is always applied in markdown with 2 asterisks
  - _Italic text_ is used to introduce, or highlight technical terms. It is always applied in markdown with 1 underscore
  - `Backticks` are used for filenames and code elements written inline, including filenames, variable or function names, and short snippets of code
  - **Example:** When adding a redirect to a _Farcaster Frame_, you **must** return `status: 302` as a part of your `NextResponse.redirect`
  - Use > to indent quotes
- Code blocks start and end with three backticks. You must specify the correct language

## Document Structure

- Filenames are kebab-case.md
- Files are set to 2 or 4 spaces depending on the the dominant programming language used in the document. When in doubt, use 2 spaces
- Videos must never be longer than 3 minutes. Instead of making a 30 minute video with 10 sections, make 10 3 minute videos
- All headings have exactly 1 blank line after them
- Documents must end with exactly 1 blank line
- Use [reference-style] links only
- All documents must have appropriate frontmatter, including the `title`, `description`, and `keywords`.
- All other headings must be H2 (##) or lower
- Immediately after the title and frontmatter is an overall summary of the experience and goals of the activity
- After the summary is a header for ## Learning Objectives
- Include appropriate learning objectives with Bloom's Taxonomy verbs in a bulleted list
- If the document is a Step-by-Step, the remaining subsections are given H2 headers starting with "Part # - ", for example "Part 2 - Compiling the Code"
- Otherwise, remaining subsections are named as appropriate, using H2 and H3 headers
- Do not use H4, H5, or H6
- All documents end with a ## Conclusion
- The conclusion is short and describes what the learner has accomplished. It should be a paragraph, not a bulleted list or repeat of the learning objectives
- Place relative-style links after the conclusion

## Canonical Terms and Spelling

- onchain
  - Not on-chain or on chain
- app, or onchain app if differentiating from web 2
  - Not dapp, Dapp, or dApp
- frontend and backend
  - Not front-end or front end
- Coinbase Wallet
  - Not just Coinbase in the context of the self-custodial wallet

[inclusively]: https://www.apa.org/about/apa/equity-diversity-inclusion/language-guidelines
[Oxford Comma]: https://en.wikipedia.org/wiki/Serial_comma
[reference-style]: https://www.markdownguide.org/basic-syntax/#reference-style-links
