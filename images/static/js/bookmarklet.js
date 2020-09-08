(function(){
    var jquery_version = '3.3.1';
    var site_url = 'https://1c6bace3e5a7.ngrok.io/';
    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;
  
    function bookmarklet(msg) {
      // load CSS
      var css = document.createElement('link');
      css.setAttribute('rel', 'stylesheet');
      css.setAttribute('type', 'text/css');
      css.setAttribute('href', static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*99999999999999999999));
      document.head.appendChild(css);

      // load HTML
      box_html = '<a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div>';
      var div = document.createElement('div');
      div.id = 'bookmarklet';
      div.innerHTML = box_html;
      document.body.appendChild(div);

      // close event
      document.querySelector('#bookmarklet #close').onclick = function(e) {
         e.preventDefault();
         document.getElementById('bookmarklet').remove();
      };

      // find images and display them
      images = document.querySelectorAll('img[src$="jpg"], img[src$="png"]');

      Array.from(images).forEach(
        function(image) {
            if (image.width >= min_width && image.height >= min_height)
            {
              var a = document.createElement('a');
              a.setAttribute('href', '#');
              image_url = image.getAttribute('src');
              a.innerHTML = '<img src="'+ image_url +'" />';
              document.querySelector('#bookmarklet .images').appendChild(a);
            }
        }
      );


      // when an image is selected open URL with it
      links = document.querySelectorAll('#bookmarklet .images a');
      Array.from(links).forEach(
        function(link) {
            link.onclick = function(e) {
                e.preventDefault();
                selected_image = link.children[0].src;
                // hide bookmarklet
                document.getElementById('bookmarklet').hidden = true;
                // open new window to submit the image

                window.open(site_url +'images/create/?url='
                + encodeURIComponent(selected_image)
                + '&title='
                + encodeURIComponent(document.getElementsByTagName('title')[0].textContent),
                '_blank');
            }
        }
      );
    };

    bookmarklet();
  })()
