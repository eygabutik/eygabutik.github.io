"use strict";

(function(e) {
    var obj = {
      init: function() {
        this.initWishlist();
      },
      initWishlist: function() {
        obj.buttonAddEvent();
        obj.buttonRemoveEvent();
      },

      // wishlist
      buttonAddEvent: function() {
        if (e(".add-to-wishlist").length > 0) {
          e('.add-to-wishlist').unbind();
          e('.add-to-wishlist').each(function() {
            e(this).on( "click", function(event) {
              event.preventDefault();
              $('.wishlist-loading').show();
              $('.wishlist-overlap').show();                            
              var variant_id = e(this).attr('id');//remove after success, and get object not a link
              var _parent = e(this).parent().parent().parent().parent();
              var form = e(_parent).find('.wishlist-form form');
              var btn = e(_parent).find('.wishlist-added');
              var _this = this;
              e.ajax({
                type: "POST",
                url: "/contact",
                data: form.serialize(),
                success: function(data) {
                  obj.showMessage();
                  //setTimeout(obj.hideMessage, 4000);
                  btn.show();
                  form.parent().remove();  
                  $('.wishlist-loading').hide();
                  setTimeout($('.wishlist-overlap').hide(),1000);                            
                },
                error: function(XMLHttpRequest, textStatus) {
                  alert("error");
                }
              });
              $('.wishlist-product-id').html(e(this).data("productid"));
              $('.wishlist-product-name a span').html(e(this).data("productname"));
              $('.wishlist-product-img img').attr("src",e(this).data("productimg"));
              $('.wishlist-product-name a').attr("src",e(this).data("productimg"));              
            });
          });
        }
      },
      //remove from wishlist page
      buttonRemoveEvent: function() {
        if (e(".product-remove").length > 0) {
          e('.product-remove a').each(function() {
            e(this).click(function(event) {
              event.preventDefault();
              var form = e("#wishlist-remove .contact-form");
              var item = e(this).parent().parent().parent().parent();
              var tagID = e(this).attr('id');
              e('#remove-value').val(tagID);
              e.ajax({
                type: "POST",
                url: "/contact",
                data: form.serialize(),
                success: function(data) {
                  item.fadeOut(500);
                  setTimeout(obj.removeItem, 500, data, item);
                },
                error: function(XMLHttpRequest, textStatus) {
                  alert("error");
                }
              });
            });
          });
        }
      },
      removeItem: function(data, item) {
        item.remove();
        if(e('.wishlist-table tbody tr').length < 1 )
        {
          var content = e(data).find('.wishlist-page');
          e('.wishlist-page').replaceWith(content);
        }
      },
      // Utils
      showMessage: function() {
        jQuery('#modalAddToWishlist').modal("toggle");
      },
      hideMessage: function() {
        
      }
  	}

    e(document).ready(function() {
      	obj.init();
        e('#centerCol').on( "initWishlist", function(event) {
          if (e(".add-to-wishlist").length > 0) {
          	obj.init();
          }
        });
    });

})(jQuery)