import api from "./api";

export interface CategoryType {
    id: Number;
    name: String;
    count: Number;
}

const category = {
    index: async function (): Promise<CategoryType[]> {
        const result = await api.get("/categories");

        return result;
    },
};

export default category;
