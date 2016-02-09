void function() {

	var _ = (a => new ArrayWrapper(a));
	_.map = map; /*.......*/ map.bind = (()=>map);
	_.filter = filter; /*.*/ filter.bind = (()=>filter);
	_.reduce = reduce; /*.*/ reduce.bind = (()=>reduce);
	window.CSSUsageLodash = _;
	// test case: 
	// 35 = CSSUsageLodash([1,2,3,4,5]).map(v => v*v).filter(v => v%2).reduce(0, (a,b)=>(a+b)).value()
	
	function ArrayWrapper(array) {
		this.source = array;
		this.map = function(f) { return new ArrayWrapper(map(this.source, f) )};
		this.filter = function(f) { return new ArrayWrapper(filter(this.source, f) )};
		this.reduce = function(v,f) { return new ArrayWrapper(reduce(this.source, f, v) )};
		this.value = function() { return this.source };
	}
	
	function map(source, transform) {
		var clone = new Array(source.length);
		for(var i = source.length; i--;) {
			clone[i] = transform(source[i]);
		}
		return clone;
	}
	
	function filter(source, shouldValueBeIncluded) {
		var clone = new Array(source.length), i=0;
		for(var value of source) {
			if(shouldValueBeIncluded(value)) {
				clone[i++] = value
			}
		}
		clone.length = i;
		return clone;
	}
	
	function reduce(source, computeReduction, reduction) {
		for(var value of source) {
			reduction = computeReduction(reduction, value);
		}
		return reduction;
	}
	
}();