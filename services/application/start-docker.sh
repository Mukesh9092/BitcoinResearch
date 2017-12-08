#!/usr/bin/env bash
npm install
npm run typescript-build
npm run typescript-watch&
exec npm run dev
