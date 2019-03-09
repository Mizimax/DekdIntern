var carousel = {
  startAt: 1,
  current: 0, //start at first image
  init: function(config) {
    /* set config */
    for (var conf in config) {
      if (carousel.hasOwnProperty(conf)) {
        carousel[conf] = config[conf];
      }
    }

    var images = this.getImages();
    this.current = this.startAt - 1;
    if (images.length != 0 && this.startAt <= images.length) {
      this.loadResource(images);
      /* arrange images */
      this.dotSelect(this.current);
    }
  },
  loadResource: function(images) {
    var dots = '<ul class="carousel_dots">'; //load dots
    var carousel = document.getElementsByClassName("carousel")[0];
    carousel.innerHTML +=
      '<i class="fas fa-chevron-left" onclick="carousel.prev()"></i>'; //load left button
    carousel.innerHTML +=
      '<i class="fas fa-chevron-right" onclick="carousel.next()"></i>'; //load right button

    for (var i = 0; i < images.length; i++) {
      var image = images[i].attributes[1].value;
      images[i].style.backgroundImage = "url(" + image + ")";

      if (this.current !== i) {
        dots +=
          '<li class="carousel_dot" onclick="carousel.dotSelect(' +
          i +
          ')"></li>';
      } else {
        dots +=
          '<li class="carousel_dot active" onclick="carousel.dotSelect(' +
          i +
          ')"></li>';
      }
    }
    dots += "</ul>";
    carousel.innerHTML += dots;
  },
  getImages: function() {
    return document.getElementsByClassName("carousel_list_img");
  },
  getLength: function() {
    return this.getImages().length;
  },
  next: function() {
    if (this.current < this.getLength() - 1) {
      this.dotSelect(++this.current);
    }
  },
  prev: function() {
    if (this.current > 0) {
      this.dotSelect(--this.current);
    }
  },
  dotSelect: function(selected) {
    this.current = selected;

    /* toggle dot button */
    document
      .getElementsByClassName("carousel_dot active")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("carousel_dot")
      [selected].classList.add("active");

    /* arrange images */
    var images = this.getImages();
    var transform = -50;
    var margin = 0;
    for (var x = this.current; x >= 0; x--) {
      images[x].style.transform =
        "translateX(calc(" + transform + "% - " + margin + "px))";
      transform -= 100;
      margin += 20;
    }
    transform = -50;
    margin = 0;
    for (var y = this.current; y < this.getLength(); y++) {
      images[y].style.transform =
        "translateX(calc(" + transform + "% + " + margin + "px))";
      transform += 100;
      margin += 20;
    }
  }
};
