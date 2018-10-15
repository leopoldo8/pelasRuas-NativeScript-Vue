<template>
    <StackLayout class="postBG" backgroundColor="#F5F5F5" orientation="vertical">
        <ListView for="post in data" height="100%">
            <v-template>
                <FlexboxLayout height="436" class="postWrap" flexDirection="column" backgroundColor="#fff">

                    <FlexboxLayout class="post-header" flexDirection="row" justifyContent="center" flexWrap="nowrap" AlignItems="center">
                        <Label class="post-title _bold" alignSelf="flex-start" textWrap="true" :text="post.title" />
                        <Label class="post-distance _semiBold" alignSelf="baseline" textWrap="true" :text="post.distance + 'm'"/>
                    </FlexboxLayout>


                    <DockLayout :stretchLastChild="post.solved" height="300" class="post-image">
                        <StackLayout dock="left" width="15" />
                        <StackLayout dock="top" height="15" />
                        <StackLayout dock="right" width="15" />
                        <FlexboxLayout height="40" dock="bottom" AlignContent="center" flexDirection="row" justifyContent="space-between" flexWrap="nowrap" AlignItems="center">
                            <Label class="_bold" :text="post.owner" />
                            <Label class="_semiBold" :text="getTime(post)" />
                        </FlexboxLayout>
                        <FlexboxLayout v-if="post.solved" class="post-image_center" dock="center" flexDirection="column" justifyContent="center" AlignContent="center" flexWrap="nowrap" AlignItems="center">
                            <StackLayout width="40" height="40" class="post-solved_img" />
                            <Label text="SOLUCIONADO" class="post-solved_txt _bold" />
                        </FlexboxLayout>
                    </DockLayout>

                    <FlexboxLayout class="post-actions" flexDirection="row" justifyContent="space-between" flexWrap="nowrap" AlignItems="center" height="64">
                        <FlexboxLayout width="70" flexDirection="row" justifyContent="space-between" AlignContent="center" flexWrap="nowrap" AlignItems="center">
                            <StackLayout width="27" height="23" class="post-support" />
                            <StackLayout width="22" height="23" class="post-comment" />
                        </FlexboxLayout>
                        <FlexboxLayout flexDirection="row" justifyContent="space-between" AlignContent="center" flexWrap="nowrap" AlignItems="center" alignSelf="center">
                            <Label :text="post.followers + ' seguidores'" class="post-info_followers _semiBold" />
                            <Label :text="post.comments + ' comentários'" class="post-info_comments _semiBold" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>
            </v-template>
        </ListView>
    </StackLayout>
</template>

<script>
export default {
    name: 'PostsView',
    props: {
        data: Array
    },
    methods: {
        getTime(post) {
            var dateDiff = new Date(new Date() - new Date(post.time));
            var yearsDiff = dateDiff.getUTCFullYear() - 1970;
            var monthsDiff = dateDiff.getUTCMonth();
            var daysDiff = dateDiff.getUTCDate();

            if (yearsDiff === 1) return yearsDiff + ' ano';
            else if (yearsDiff != 0) return yearsDiff + ' anos';
            else if (monthsDiff === 1) return monthsDiff + ' mês';
            else if (monthsDiff != 0) return monthsDiff + ' meses';
            else if (daysDiff === 1) return 'ontem';
            else if (daysDiff != 0) return daysDiff + ' dias';
            else return 'hoje';
        }
    }
}
</script>

<style lang="scss" scoped>
    .postBG {
        .postWrap {
            width: 100%;
            font-size: 14px;
            margin: 0 0 30px 0;

            .post-header {
                width: 100%;
                margin: 19px 15px 17px 15px;

                .post-title {
                    font-size: 16px;
                    color: #151316;
                    vertical-align: top;
                    line-height: 1px;
                }
                .post-distance {
                    margin-left: 10px;
                    color: #B9B8B9;
                    white-space: nowrap;
                    min-width: 75px;
                    vertical-align: top;
                    line-height: 1px;
                }
            }

            .post-image {
                color: white;
                background-image: url('~/assets/images/post_1_image.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;

                .post-image_center {
                    text-align: center;

                    .post-solved_txt {
                        margin-top: 6px;
                        font-size: 11px;

                    }
                    .post-solved_img {
                        background-image: url('~/assets/images/solved.png');
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: contain;
                    }
                }
            }

            .post-actions {
                margin: 0 15px;

                .post-support {
                    background-image: url('~/assets/images/post_support.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                }

                .post-comment {
                    background-image: url('~/assets/images/post_comment.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                }

                .post-info_comments, .post-info_followers {
                    vertical-align: center;
                    color: #ABB8C1;
                }

                .post-info_comments {
                    margin-left: 23px;
                }
            }
        }
    }
</style>
