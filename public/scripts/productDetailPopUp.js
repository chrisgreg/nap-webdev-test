$(function() {
    $( ".product-item" ).click(function(event) {
       cleanup();
       var pid = event.currentTarget.id;
       addMoreInfo(pid, event);
       return false;
    });

    function cleanup(){
      $('.product-item.expanded').removeClass('expanded');
      $('.temp').hide();
    }

    function addMoreInfo(pid, event){
      $.getJSON('/api/product/' + pid, function(product){
        $(event.currentTarget).addClass('expanded');
        $(event.currentTarget).find(".details").append(productSizes(product));
        $(event.currentTarget).append(additionalImage(product));
      })
    }

    function additionalImage(payload){
      return "<div class='temp' style='float:right'><img src="+payload.images.small+"></img></img></div>"
    }

    function productSizes(payload){
      if (payload.sizes.length == 0)
        return "";

      var sizes = payload.sizes
                  .map((size) => {
                    return "<div class='size'>" + size.name + "</div>";
                  }).reduce((a, b) => a + b);

      return "<div class='temp'><br><h5>Available in: </h5>" +sizes
            + "</div>";
    }
  });
