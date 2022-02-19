export type DataContentOptions = {
  cost?: number
  date?: string
  done?: number
  emoji?: string
  item?: string
  name?: string
  note?: string
  wage?: number
}

export type DataCategory = {
  class: string
  title: string
  subtitle: string
}

export type Data = DataCategory & { content: DataContentOptions[] }
