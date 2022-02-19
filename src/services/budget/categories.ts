import { DataCategory } from "./types";

const wantStartYear = new Date().getFullYear()
const wantEndYear = +wantStartYear + 2

export const categories: DataCategory[] = [
   {
    class: "have-month",
    title: "WHAT WE HAVE",
    subtitle: "per month",
   },
   {
    class: "need-month",
    title: "WHAT WE NEED",
    subtitle: "per month",
   },
   {
    class: "need-year",
    title: "WHAT WE NEED",
    subtitle: "per year",
   },
   {
    class: "want",
    title: "WHAT WE WANT",
    subtitle: `${wantStartYear} - ${wantEndYear}`,
   },
   {
    class: "goals",
    title: "LONG-TERM GOALS",
    subtitle: "future",
   },
]

export const initialCategories = categories.map((category) => ({ ...category, content: [] }))