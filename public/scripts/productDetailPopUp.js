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
        $(event.currentTarget).append(createMoreInformation(product));
      })
    }

    function createMoreInformation(payload){
      return "<div class='temp' style='float:right'><img src="+payload.images.small+"></img></img></div>"
    }
  });
