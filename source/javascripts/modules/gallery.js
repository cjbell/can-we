!function(global, $, BigBird) {
  'use strict';

  global.Gallery = BigBird.Module.extend({

    proxied: ['on_window_resize', 'on_item_click'],

    initialize: function() {
      this.$w = $(window);
      this.$inner = this.$el.find('.gallery-content__inner');
      this.$items = this.$inner.find('.gallery__item');
      this.items_length = this.$items.length;

      this.setup();
    },

    setup: function() {
      this.current_index = 1;
      this.bind_extra();
      this.on_window_resize();
    },

    bind_extra: function() {
      this.$items.bind('click', this.on_item_click);
      this.$w.bind('resize', this.on_window_resize);
    },

    on_window_resize: function() {
      var max_width = Math.min(960, this.$w.width()),
          calculated_size = this.calculate_item_size(max_width),
          gutters = ((max_width + 10) / 10);

      this.update_item_sizes(calculated_size);
      this.update_container_width(calculated_size + 10);
      this.offset_container(gutters);

      this.current_gutter = gutters;
      this.current_width = calculated_size + 10;
    },

    on_item_click: function(e) {
      var item = $(e.currentTarget),
          index = this.$items.index(item);

      this.$inner.css({ 'left': -(this.current_width * index) + 'px' });
    },

    calculate_item_size: function(max_width) {
      return Math.floor(max_width - (max_width / 10));
    },

    update_item_sizes: function(width) {
      this.$items.css({ width: width + 'px' });
    },

    update_container_width: function(width) {
      this.$inner.css({ width: (width * this.items_length) + 'px' })
    },

    offset_container: function(gutters) {
      this.$inner.css({ 'margin-left': gutters / 2 + 'px' });
    }


  });

}(this, jQuery, BigBird);