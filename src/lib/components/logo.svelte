<div class="container">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style="background: transparent; background-color: transparent; color-scheme: light dark;"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="217px"
        height="110px"
        viewBox="-0.5 -0.5 217 110"
        ><defs /><g
            ><g data-cell-id="0"
                ><g data-cell-id="1"
                    ><g data-cell-id="VVed_HWuA1PWB0cNzXyy-26"
                        ><g
                            ><path
                                d="M 34 104 L 39 104 Q 44 104 34 104 L 29 104 Q 24 104 24 94 L 24 84 Q 24 74 16.93 66.93 L 10.46 60.46 Q 4 54 11.07 46.93 L 17.54 40.46 Q 24 34 24 24 L 24 14 Q 24 4 34 4 L 39 4 Q 44 4 39 4 L 34 4"
                                fill="none"
                                stroke="#001dbc"
                                stroke-miterlimit="10"
                                pointer-events="stroke"
                                class="bracket"
                            /></g
                        ></g
                    ><g data-cell-id="VVed_HWuA1PWB0cNzXyy-27"
                        ><g
                            ><path
                                d="M 181 104 L 176 104 Q 171 104 181 104 L 186 104 Q 191 104 191 94 L 191 84 Q 191 74 198.07 66.93 L 204.54 60.46 Q 211 54 203.93 46.93 L 197.46 40.46 Q 191 34 191 24 L 191 14 Q 191 4 181 4 L 176 4 Q 171 4 176 4 L 181 4"
                                fill="none"
                                stroke="#001dbc"
                                stroke-miterlimit="10"
                                pointer-events="stroke"
                                class="bracket"
                            /></g
                        ></g
                    ><g data-cell-id="VVed_HWuA1PWB0cNzXyy-28"
                        ><g
                            ><path
                                d="M 59 54 L 59 94 Q 59 104 59 94 L 59 14 Q 59 4 59 14 L 59 54"
                                fill="none"
                                stroke="#000000"
                                stroke-miterlimit="10"
                                pointer-events="stroke"
                                class="letter"
                            /></g
                        ></g
                    ><g data-cell-id="VVed_HWuA1PWB0cNzXyy-31"
                        ><g
                            ><path
                                d="M 99 54 L 99 94 Q 99 104 99 94 L 99 14 Q 99 4 99 14 L 99 54"
                                fill="none"
                                stroke="#000000"
                                stroke-miterlimit="10"
                                pointer-events="stroke"
                                class="letter"
                            /></g
                        ></g
                    ><g data-cell-id="VVed_HWuA1PWB0cNzXyy-32"
                        ><g
                            ><path
                                d="M 99 54 L 59 54"
                                fill="none"
                                stroke="#000000"
                                stroke-miterlimit="10"
                                pointer-events="stroke"
                                class="letter"
                            /></g
                        ></g
                    ><g data-cell-id="VVed_HWuA1PWB0cNzXyy-33"
                        ><g
                            ><path
                                d="M 139 99 Q 109 99 134 99 Q 159 99 159 74 Q 159 49 139 49 Q 119 49 119 29 Q 119 9 144 9 Q 169 9 139 9"
                                fill="none"
                                stroke="#000000"
                                stroke-miterlimit="10"
                                pointer-events="stroke"
                                class="letter"
                            /></g
                        ></g
                    ></g
                ></g
            ></g
        ></svg
    >
</div>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    .container {
        margin: auto;
        width: 40px;
        height: 20px;

        &:hover {
            cursor: pointer;

            .letter {
                stroke: var.$primary;
            }
        }
    }

    svg {
        width: 100%;
        height: 100%;

        path {
            stroke-width: 10;
        }

        .bracket {
            stroke: var.$primary;
        }

        .letter {
            stroke: var.$text;
        }
    }
</style>
