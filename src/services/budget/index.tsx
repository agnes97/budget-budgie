import { Data, KindaEverything } from "../../../public/data/types"

export const getData = ():Promise<Data[]> => 
  fetch("./data/showcase.json")
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.error(error))

// COUNT WAGES
export const countMonthlyWage = (data: Data[], key: number) => {
  const location = data[key]?.content

  if (location) {
    return location
      .map((contentItem: KindaEverything) => contentItem.wage)
      .reduce((acc: number, contentItem: number | undefined) => acc + (contentItem ?? 0), 0)
  }
}

// COUNT COSTS
export const countCost = (data: Data[], key: number, column: "wage" | "cost") => {
  const location = data[key]?.content

  if (location) {
    return location
      .map((contentItem: KindaEverything) => contentItem[column])
      .reduce((acc: number, contentItem: KindaEverything[typeof column]) => acc + (contentItem ?? 0), 0)
  }
}

// SORT ITEMS
export const sortItemsBy = (arrayToSort: KindaEverything[], sortBy: keyof KindaEverything) => 
  arrayToSort.sort((a: KindaEverything, b: KindaEverything) => {
    let one = a[sortBy]?.toString()?.trim()?.toLowerCase() ?? ""
    let two = b[sortBy]?.toString()?.trim()?.toLowerCase() ?? ""

    return (one < two) ? -1 : 1
})

// SORT CERTAIN EMOJI LAST
export const sortByEmoji = (arrayToSort: KindaEverything[], emoji: string) => 
  arrayToSort.sort((a: KindaEverything, b: KindaEverything) => {
    let one = a.emoji?.indexOf(emoji) ?? -1
    let two = b.emoji?.indexOf(emoji) ?? -1

    return one - two
})