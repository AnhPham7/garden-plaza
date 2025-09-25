import fs from "fs";
import path from "path";
import { test } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(
  fs.readFileSync(path.join(__dirname, "/data/csv/booking_1000.csv"), "utf8"),
  {
    columns: true,
    skip_empty_lines: true,
  }
);
