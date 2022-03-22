import api from "./api";

export interface PostType {
    id: number;
    title: string;
    date: string;
    content: string;
    excerpt: string;
    featured_image: string | undefined;
    url: string;
    _embedded: {
        author: {
            name: string;
        };
    };
    link: string;
}

const post = {
    list: async function (params: Object = {}): Promise<PostType[]> {
        const result = await api.get("/posts", { ...{ per_page: 25, _embed: true }, ...params });

        return result.map((postData: any) => {
            return {
                id: postData.id,
                title: postData.title.rendered,
                date: postData.date,
                content: postData.content.rendered,
                excerpt: postData.excerpt.rendered,
                featured_image: postData._embedded["wp:featuredmedia"]
                    ? postData._embedded["wp:featuredmedia"][0]?.source_url
                    : null,
                url: "/posts/" + postData.id,
                _embedded: {
                    author: {
                        name: postData._embedded.author[0].name,
                    },
                },
                link: postData.link,
            } as PostType;
        });
    },

    show: async function (id: number): Promise<PostType> {
        const postData = await api.get("/posts/" + id, { _embed: true });
        console.log(postData);
        return {
            id: postData.id,
            title: postData.title.rendered,
            date: postData.date,
            content: postData.content.rendered,
            excerpt: postData.excerpt.rendered,
            featured_image: postData._embedded["wp:featuredmedia"]
                ? postData._embedded["wp:featuredmedia"][0]?.source_url
                : null,
            url: "/posts/" + postData.id,
            _embedded: {
                author: {
                    name: postData._embedded.author[0].name,
                },
            },
            link: postData.link,
        } as PostType;
    },
};

export default post;
