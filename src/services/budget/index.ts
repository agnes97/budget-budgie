import { doc, getDoc } from "firebase/firestore"
import { firestore } from "services/firebase"
import { Data, DataContentOptions } from "./types"
import { categories, initialCategories } from "./categories"

export const getData = async (documentId: string): Promise<Data[]> => {
  const snapshot = await getDoc(doc(firestore, "budgets", documentId))

  if (!snapshot.exists()) return initialCategories

  const data: Record<string, DataContentOptions[]> = snapshot.data().categories

  return categories.map((category) => ({ ...category, content: data[category.class] ?? [] }))
}

// COUNT WAGES
export const countMonthlyWage = (data: Data[], key: number) => {
  const location = data[key]?.content

  if (location) {
    return location
      .map((contentItem: DataContentOptions) => contentItem.wage)
      .reduce((acc: number, contentItem: number | undefined) => acc + (contentItem ?? 0), 0)
  }
}

// COUNT COSTS
export const countCost = (data: Data[], key: number, column: "wage" | "cost") => {
  const location = data[key]?.content

  if (location) {
    return location
      .map((contentItem: DataContentOptions) => contentItem[column])
      .reduce((acc: number, contentItem: DataContentOptions[typeof column]) => acc + (contentItem ?? 0), 0)
  }
}

// SORT ITEMS
export const sortItemsBy = (arrayToSort: DataContentOptions[], sortBy: keyof DataContentOptions) => 
  arrayToSort.sort((a: DataContentOptions, b: DataContentOptions) => {
    let one = a[sortBy]?.toString()?.trim()?.toLowerCase() ?? ""
    let two = b[sortBy]?.toString()?.trim()?.toLowerCase() ?? ""

    return (one < two) ? -1 : 1
})

// SORT CERTAIN EMOJI LAST
export const sortByEmoji = (arrayToSort: DataContentOptions[], emoji: string) => 
  arrayToSort.sort((a: DataContentOptions, b: DataContentOptions) => {
    let one = a.emoji?.indexOf(emoji) ?? -1
    let two = b.emoji?.indexOf(emoji) ?? -1

    return one - two
})