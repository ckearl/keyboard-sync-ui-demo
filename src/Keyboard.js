import React, { useState, useEffect } from "react";
import Key from "./Key";
import "./Keyboard.css";

import KEYS from "./constants/keys";
import KEYBOARD_LAYOUT from "./constants/keyboardLayout";

const Keyboard = () => {
	const [pressedKeys, setPressedKeys] = useState({});
	const [everPressedKeys, setEverPressedKeys] = useState({});

	useEffect(() => {
		const handleKeyDown = (event) => {
			const key = event.key.toUpperCase();
			setPressedKeys((prev) => ({ ...prev, [key]: true }));
			setEverPressedKeys((prev) => ({ ...prev, [key]: true }));
		};

		const handleKeyUp = (event) => {
			const key = event.key.toUpperCase();
			setPressedKeys((prev) => ({ ...prev, [key]: false }));
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	const getKeyProps = (keyId) => {
		if (keyId === "`") return KEYS[""];
		if (keyId === "\\") return KEYS["\\"];
		return KEYS[keyId] || { name: keyId, width: 1, row: 1, pressed: false };
	};

	return (
		<div className="keyboard">
			{KEYBOARD_LAYOUT.map((row, rowIndex) => (
				<div key={rowIndex} className="keyboard-row">
					{row.map((keyId) => {
						const keyProps = getKeyProps(keyId);
						const upperKeyId = keyId.toUpperCase();
						return (
							<Key
								key={keyId}
								keyName={keyProps.name}
								width={keyProps.width}
								isPressed={pressedKeys[upperKeyId] || false}
								hasBeenPressed={everPressedKeys[upperKeyId] || false}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Keyboard;