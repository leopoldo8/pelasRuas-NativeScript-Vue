<template>
    <StackLayout class="template-box" width="100%">
        <DockLayout class="boxTab-bg" height="46" backgroundColor="#F5F5F5" >
            <FlexboxLayout dock="center" class="boxTab" width="100%" height="26" flexDirection="row" flexWrap="nowrap" justifyContent="space-around" AlignContent="center" AlignItems="center">
                <StackLayout orientation="horizontal" alignSelf="center">
                    <Image :src="insertIconSt" width="15" height="16" class="title-icon" />=
                    <Label :text="insertTitleSt" ref="titleST" :class="{active: !STstate}" @tap="changeToSt"  />
                </StackLayout>

                <Label class="tab-border" width="1" backgroundColor="#979797" />

                <StackLayout orientation="horizontal" alignSelf="center">
                    <Image :src="insertIconNd" width="12" height="16" class="title-icon" />
                    <Label :text="insertTitleNd" ref="titleND" :class="{active: !NDstate}" @tap="changeToNd" />
                </StackLayout>
            </FlexboxLayout>
        </DockLayout>
        <AbsoluteLayout :width="(pageWidth*2)" class="boxViews">
            <StackLayout :left="0" width="100%" height="100%" class="tabView-st" ref="tabViewSt"><slot name="firstTab-content"></slot></StackLayout>
            <StackLayout :left="768" width="100%" height="100%" class="tabTwo-nd" ref="tabViewNd"><slot name="secondTab-content"></slot></StackLayout>
        </AbsoluteLayout>
    </StackLayout>
</template>

<script>
const platform = require("tns-core-modules/platform");

export default {
    name: 'tabViewBorder',
    props: {
        titles: Array,
        icons: Object
    },
    data: function () {
        return {
            pageWidth: platform.screen.mainScreen.widthPixels,
            STstate: 0,
            NDstate: platform.screen.mainScreen.widthPixels
        }
    },
    computed: {
        insertTitleSt() {
            return this.titles[0];
        },
        insertTitleNd() {
            return this.titles[1];
        },
        insertIconSt() {
            if (!this.STstate) return this.icons.ST.selected;
            else return this.icons.ST.unselected;
        },
        insertIconNd() {
            if (!this.NDstate) return this.icons.ND.selected;
            else return this.icons.ND.unselected;
        },
        insertStLeft() {
            return this.STstate;
        },
        insertNdLeft() {
            return this.NDstate;
        }
    },
    methods: {
        changeToSt() {
            if (this.STstate == 0) return;
            this.$refs.tabViewNd.nativeView.animate({
                translate: {x: this.pageWidth, y: 0},
                duration: 600
            })

            this.$refs.tabViewSt.nativeView.animate({
                translate: {x: 0, y: 0},
                duration: 600
            }).then(() => {
                this.STstate = 0;
                this.NDstate = this.pageWidth;
            })
        },
        changeToNd() {
            if (this.NDstate == 0) return;
            this.$refs.tabViewSt.nativeView.animate({
                translate: {x: -this.pageWidth, y: 0},
                duration: 600
            })

            this.$refs.tabViewNd.nativeView.animate({
                translate: {x: -this.pageWidth, y: 0},
                duration: 600
            }).then(() => {
                this.STstate = -this.pageWidth;
                this.NDstate = 0;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.template-box {
    overflow: visible;

  .boxTab-bg {
    text-align: center;
    display: flex;
    align-content: center;

    .boxTab {
      text-align: center;
      vertical-align: center;

      .title-icon {
            margin-right: 10px;
      }

      label {
        font-size: 13px;
        text-transform: uppercase;
        color: #B2B1B2;
        transition: all .6s ease-in-out;

        &.active {
            color: black;
        }
      }

      .tab-border {
        overflow: hidden;
        max-height: 26px;
        opacity: .2;
      }
    }
  }

  .boxViews {
    overflow: hidden;

    .tabView-st, .tabTwo-nd {
        transition: all .5s ease-in-out;
    }
  }
}
</style>
