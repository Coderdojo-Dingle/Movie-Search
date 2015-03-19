$(function(){

  var url = 'http://api.themoviedb.org/3/',
  mode = 'search/movie',
  baseIMG = 'https://image.tmdb.org/t/p/original/',
  noPoster = "http://sensorpro.net/documents/dojo/noposter.png",
  input,
  movieName,
  key = '?api_key=61a82aca6630ae1cbc3635d8710c0fbe';

  $(document).ready(function() {
    $("#searchTerm").keypress(function(e) {
      if(e.keyCode == 13) {
        $("#search").click();
      }
    });
  });

  $('#search').click(function() {
    $('#info').html('');
    var input = $('#searchTerm').val();
    movieName = encodeURI(input);

    $.ajax({
      url: url + mode + key + '&query=' + movieName,
      dataType: 'json',
      success: function(data) {
        if(data.total_results == 0) {
          alert('No movies with parameter ' + movieName + ' found?!');
        }else{
          console.log(data);
          for(var i = 0; i < data.results.length; i++) {
            if(data.results[i].poster_path) {
              $('#info').append("<li><img style='width:300px; height:auto;' id='Poster' src='"+baseIMG+ data.results[i].poster_path+"'></li>");
            }else {
              $("#info").append("<li><img id='Poster' style='width:300px; height:auto;' src='" + noPoster + "'/></li>");
            }
          }
        }
      }
    });
  });

});
