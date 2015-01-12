;
(function ($, window, document, undefined) {

	var pluginName = '<%= camelizedPluginName %>';
	var defaults = {

	};

	function Plugin(el, options) {
		this.el = el;
		this.settings = $.extend(true, {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {

		}
	});

	$.fn[pluginName] = function (options) {
		this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
		return this;
	};

})(jQuery, window, document);
