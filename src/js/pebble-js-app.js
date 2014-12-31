var initialized = false;
Pebble.addEventListener("ready", function() {
console.log("ready called!");
initialized = true;
});
Pebble.addEventListener("showConfiguration", function() {
var saveOptions = JSON.parse(window.localStorage.getItem("options"));
var url = "http://zckr.com/prieni/revolving_bubbles_config.php?v=1.0";
if(saveOptions !== null) {
url += "&time=" + (saveOptions["innercirc0"] ? encodeURIComponent(saveOptions["innercirc0"]) : "") +
"&date=" + (saveOptions["innercirc1"] ? encodeURIComponent(saveOptions["innercirc1"]) : "") +
"&rowd=" + (saveOptions["innercirc2"] ? encodeURIComponent(saveOptions["innercirc2"]) : "") +
"&invt=" + (saveOptions["innercirc3"] ? encodeURIComponent(saveOptions["innercirc3"]) : "") +
"&four=" + (saveOptions["innercirc4"] ? encodeURIComponent(saveOptions["innercirc4"]) : "");
}
console.log("Showing configuration: " + url);
Pebble.openURL(url);
});
Pebble.addEventListener("webviewclosed", function(e) {
console.log("configuration closed");
// webview closed
if(e.response && e.response.length>5) {
var options = JSON.parse(decodeURIComponent(e.response));
console.log("Options = " + JSON.stringify(options));
var saveOptions = {
"innercirc0": options["0"],
"innercirc1": options["1"],
"innercirc2": options["2"],
"innercirc3": options["3"],
"innercirc4": options["4"]
};
window.localStorage.setItem("options", JSON.stringify(saveOptions));
Pebble.sendAppMessage(options,
function(e) {
console.log("Successfully sent options to Pebble");
},
function(e) {
console.log("Failed to send options to Pebble.\nError: " + e.error.message);
}
);
} else {
console.log("Error with JS Config options received.");	
}
});