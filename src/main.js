import App from "./App.svelte";

const app = new App({
    target: document.body,
    props: {
        name: "Ok now it seems to work"
    }
});