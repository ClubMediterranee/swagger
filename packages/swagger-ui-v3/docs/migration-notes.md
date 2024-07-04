---
title: Migration notes
banner: Welcome to our guide on migrating notes for a REST API.
---

## Introduction

This page is dedicated to helping developers understand the process of transferring, updating, and managing notes within a REST architecture.

Whether you're looking to upgrade your existing API, change backend systems, or simply reorganize your data structure, this guide provides comprehensive instructions and best practices to ensure a smooth and efficient migration.
Our aim is to equip you with the knowledge and tools necessary to handle this crucial aspect of API maintenance seamlessly.

## About breaking changes

The ClubMed REST API is versioned. The version is reflected on each routes from `/v0` to `vN`.

For example, our main Product information route exists in `/v0/products` and `/v1/products` but our swagger documentation
display only the latest version of the API (by default).

We don't create a global version for all routes, each route has its own version.

Any breaking changes will be released in a new API version. Breaking changes are changes that can potentially break an integration. Breaking changes include:

- removing an entire operation
- removing or renaming a parameter
- removing or renaming a response field
- adding a new required parameter
- making a previously optional parameter required
- changing the type of a parameter or response field
- removing enum values
- adding a new validation rule to an existing parameter
- changing authentication or authorization requirements

Any additive (non-breaking) changes will be available in all supported API versions. Additive changes are changes that should not break an integration. Additive changes include:

- adding an operation
- adding an optional parameter
- adding an optional request header
- adding a response field
- adding a response header
- adding enum values

When a new REST API version is released, the previous API version will be supported for at least 6 more months following the release of the new version a route.
