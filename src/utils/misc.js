
// Dont even. Removes duplicates.
	whackAssShit = () => {
		return events.filter(
			(outer => obj =>
				(inner => !outer.has(inner) && outer.add(inner))(
					keys.map(inner => obj[inner]).join("|")
				))(new Set())
		);
	}