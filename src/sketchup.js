const sketchup = msg => {
	window.location.href = `skp:message@${JSON.stringify(msg)}`;
};

export default sketchup;
