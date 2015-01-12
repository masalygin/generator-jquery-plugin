var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
	prompting: function() {
		var done = this.async();
		var prompts = [{
			type: 'input',
			name: 'pluginName',
			message: 'Name of the plugin:'
		}, {
			type: 'confirm',
			name: 'hasQunit',
			message: 'You need qunit.js?',
			default: true
		}];

		this.prompt(prompts, function(props) {
			this.pluginName = props.pluginName;
			this.camelizedPluginName = this._.camelize(this.pluginName);
			this.pluginFileName = this.pluginName.replace(/-/g, '.');
			this.hasQunit = props.hasQunit;
			done();
		}.bind(this));
	},
	writing: {
		app: function() {
			this.template('_bower.json', 'bower.json');
			this.template('index.html', 'index.html');
			this.template('css/index.scss', 'css/' + this.pluginFileName + '.scss');
			this.template('js/index.js', 'js/' + this.pluginFileName + '.js');
			this.src.copy('_editorconfig', '.editorconfig');
			this.src.copy('_gitignore', '.gitignore');
			if (this.hasQunit) {
				this.directory('tests', 'tests');
			}
		}
	},
	end: function() {
		this.bowerInstall();
	}
});
