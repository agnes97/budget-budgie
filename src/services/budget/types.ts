import type { DropdownItem } from 'components/DropdownMenu'
import type { BudgetDocument } from 'services/firebase/types'

export interface DataContentOptions {
  cost?: number
  date?: string
  done?: number
  emoji?: string
  item?: string
  name?: string
  note?: string
  wage?: number
}

export interface DataCategory {
  class: string
  title: string
  subtitle: string
}

export type Data = DataCategory & { content: DataContentOptions[] }

export type Budget = BudgetDocument &
  DropdownItem & {
    id: string
  }
