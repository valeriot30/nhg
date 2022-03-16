export interface ICatalogPage {
    pageId: number,
    pageInfo: {
        layout: string,
        textOne: string,
        textTwo: string
    },
    items: [],
    catalogItems: [],
    countItems: number,
    rawInfo: any,
}