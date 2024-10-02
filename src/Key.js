import React from "react";
import "./Key.css";

const Key = ({ keyName, width, isPressed, hasBeenPressed }) => {
	const style = {
		width: `${width * 60}px`,
	};

	let stateClass = "never-pressed";
	if (isPressed) {
		stateClass = "currently-pressed";
	} else if (hasBeenPressed) {
		stateClass = "was-pressed";
	}

	return (
		<div className={`key ${stateClass}`} style={style}>
			{keyName}
		</div>
	);
};

export default Key;
