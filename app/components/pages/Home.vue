<template>
  <Page class="page">
    <ActionBar class='home-header' backgroundColor="#fff" title="Pelas Ruas" android.icon="~/assets/images/pelasruas.png" flat="true">
      <image class='home-logo' src="~/assets/images/pelasruas.png" width="75" height="41" verticalAlignment="center" />
    </ActionBar>
    <TabViewBorder v-bind:titles="['Posts', 'Mapa']" v-bind:icons="{
        ST: {
          selected: '~/assets/images/posts_selected.png',
          unselected: '~/assets/images/posts_unselected.png'
        },
        ND: {
          selected: '~/assets/images/map_selected.png',
          unselected: '~/assets/images/map_unselected.png'
        }
      }"
    >
      <template class="postsTemp" slot="firstTab-content" >
        <PostsView v-bind:data="postList" />
      </template>
      <template slot="secondTab-content" >
        <MapView class="mapView-ndTab" :latitude="latitude" :longitude="longitude"  :zoom="zoom" :bearing="bearing" :tilt="tilt" :padding="padding" :mapAnimationsEnabled="mapAnimationsEnabled" :minZoom="minZoom" :maxZoom="maxZoom" @mapReady="mapReady" @markerSelect="onMarkerSelect" />
      </template>
    </tabViewBorder>
  </Page>
</template>

<script>
  //libs
  import { Position, Marker } from "nativescript-google-maps-sdk";
  import { mapActions, mapGetters } from 'vuex';

  //components
  import TabViewBorder from '~/components/tabViewTemplate';
  import PostsView from '~/components/posts';

  //config
  import MapStyle from '~/config/mapStyle.json';

  export default {
    name: 'Home',
    components: {
      TabViewBorder,
      PostsView
    },
    data () {
      return {
        latitude: -33.86,
        longitude: 151.20,
        zoom: 8,
        minZoom: 0,
        maxZoom: 22,
        bearing: 180,
        tilt: 35,
        padding: [40, 40, 40, 40],
        mapView: null,
        mapAnimationsEnabled: true
      };
	  },
    computed: {
      ...mapGetters({
        postList: 'getPosts'
      })
    },
    methods: {
      ...mapActions([
        'setPosts'
      ]),
      mapReady(args) {
        this.mapView = args.object
        this.mapView.setStyle(MapStyle);
        this.mapView.infoWindowTemplate = `
          <StackLayout orientation="vertical" width="200">
            <Label text="{{title}}" className="title"/>
            <Label text="{{snippet}}" textWrep="true" class="snippet"/>
          </StackLayout>
        `
        const marker = new Marker()
        marker.position = Position.positionFromLatLng(0, 0)
        marker.title = 'Test'
        marker.snippet = 'test'
        marker.userData = {test: 'test'}
        this.mapView.addMarker(marker)
		  },
      onMarkerSelect(args) {
        console.log(args.marker);
      }
    },
    mounted() {
      this.setPosts();
    }
  }
</script>

<style lang="scss">
  body {
    font-family: 'Source Sans Pro';
  }
  label._black {
    font-weight: 900;
  }
  label._bold {
    font-weight: 700;
  }
  label._semiBold {
    font-weight: 600;
  }
  label, label._regular {
    font-weight: 400;
  }
  label._light {
    font-weight: 300;
  }
</style>

<style lang="scss" scoped>
  .home-header {
    margin: 0 17.5px;
  }

  .mapView-ndTab {
    filter: grayscale(100%);
  }
</style>
