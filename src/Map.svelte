<style>
    #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
</style>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
//import { Threebox } from 'threebox-plugin'; <- This solved it... damn. I wasted a whole day on this. 
import '../node_modules/threebox-plugin/dist/threebox'
import Stats from './stats.module.js';
import { onMount, onDestroy } from 'svelte';

let origin = [11.3876305,48.7721364, 1]
let stats;

onMount(async () => {

    // Create the map
    let mapRef = new mapboxgl.Map({
        container: 'map',
        style: '../data/osm-liberty.json',
        attributionControl: true,
        hash: true,
        center: [11.4017, 48.7771, ],
        zoom: 15,
        pitch: 60, // pitch in degrees
        bearing: -60, // bearing in degrees
    });

    window.tb = new Threebox(
        mapRef,
        mapRef.getCanvas().getContext('webgl'),
        {
            defaultLights: true,
            enableSelectingFeatures: false, //change this to false to disable fill-extrusion features selection
            enableSelectingObjects: true, //change this to false to disable 3D objects selection
            enableTooltips: false, // change this to false to disable default tooltips on fill-extrusion and 3D models
        }
    );

    let redMaterial = new THREE.MeshPhongMaterial({
        color: 0x660000,
        side: THREE.DoubleSide
    });

    mapRef.on('load', function() {

        // stats
        stats = new Stats();
        mapRef.getContainer().appendChild(stats.dom);
        animate();

        mapRef.addLayer({
            id: 'customlayer',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function(map, mbxContext){
                // map variable to window

                //instantiate a red sphere and position it at the origin lnglat
                var sphere = tb.sphere({color: 'red', material: 'MeshToonMaterial'}).setCoords(origin);
                console.log(sphere)
                // add sphere to the scene
                tb.add(sphere);
                
                console.log("added sphere")
            },
            
            render: function (gl, matrix) {
                tb.update();
            }
        })
    });


    function animate() {
        requestAnimationFrame(animate);
        stats.update();
    }

        
});
</script>


<div id="map"></div>
  