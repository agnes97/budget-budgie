export type KindaEverything = {
    cost?: number,
    date?: string,
    done?: number,
    emoji?: string,
    item?: string,
    name?: string,
    note?: string,
    wage?: number,
}

export type Data = {
	class: string
	title: string
	subtitle: string

	content: KindaEverything[]

    total: {
        month?: number
        note?: string
        year?: number
        sum?: number
    }
}