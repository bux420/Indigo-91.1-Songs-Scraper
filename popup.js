/*
**
@ Author : l30
@ Date: 2/8/2014
@ Purpose : Extenstion to extract top 40 songs from indigo 91.9 fm wesbite.
**
*/

var url = 'http://indigo919.in/';

var req = new XMLHttpRequest();
req.open("GET", url, true);
req.onload = this.refine;
req.send(null);

var songsList = [];

function refine(e) {

  var body = e.currentTarget.response;

  var Songs_matches = body.match(/&quot;(.+?)&quot/g);
  var artist_matches = body.match(/<br \/><strong>(.+?)<\/strong><br \/><br \/>/g);

  var Songs = [],
    artist = [];

  // Skip 1st 3 values, contains unwanted data
  for (i = 3; i < Songs_matches.length; i++) {
    Songs[i - 3] = Songs_matches[i].replace('&quot;', '').replace('&quot', '').replace('\'', '').trim();
    artist[i - 3] = artist_matches[i - 3].replace('<br \/><strong>', '').replace('<\/strong><br \/><br \/>', '').trim();
  }


  for (var i = 0; i < Songs.length; i++) {
    songsList[i] = artist[i] + ' ' + Songs[i];
    $("#songs").append(songsList[i] + "<br>");
  };

}