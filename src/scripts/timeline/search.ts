import { ref } from "vue";

export const searchInput = ref<string>("");
export const searchForm = ref<{
    searchTags: string[];
    orderBy: number;
    hasLink: boolean;
    hasNote: boolean;
    hasImage: boolean;
}>({
    searchTags: [],
    orderBy: 1,
    hasLink: false,
    hasNote: false,
    hasImage: false,
});

export const addSearchTag = (tag?: string) => {
    const searchTag = tag ? tag : searchInput.value;
    if (![""].concat(searchForm.value.searchTags).includes(searchTag)) {
        searchForm.value.searchTags.push(searchTag);
        if (!tag) searchInput.value = "";
    }
};

export const removeSearchTag = (tag: string) => {
    searchForm.value.searchTags.splice(
        searchForm.value.searchTags.findIndex((value) => value === tag),
        1
    );
};
