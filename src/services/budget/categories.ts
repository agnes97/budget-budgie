import { DataCategory } from "./types";

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
    subtitle: "2021 - 2023",
   },
   {
    class: "goals",
    title: "LONG-TERM GOALS",
    subtitle: "future",
   },
]

export const initialCategories = categories.map((category) => ({ ...category, content: [] }))