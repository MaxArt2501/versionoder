const getReleaseType = release => {
    if (release.lts) return "lts";
    if (release.version.startsWith("v0.")) return "legacy";

    return "stable";
}

fetch("https://nodejs.org/dist/index.json")
    .then(response => response.json())
    .then(json => {
        const releases = json.map(rel => {
            const date = new Date(rel.date);

            return Object.assign({}, rel, { date });
        }).sort((v1, v2) => v2.date - v1.date);

        const types = [ ...new Set(releases.map(getReleaseType)) ];

        let html = `<table><thead><tr><th rowspan='2'>Date</th><th colspan='${types.length}'>Channels</th></tr><tr>`;
        for (let type of types)
            html += `<th>${type}</th>`;

        html += "</tr></thead><tbody>"
                + releases.map(rel => {
                    const idx = types.indexOf(getReleaseType(rel));
                    const rest = types.length - idx;

                    const row = `<tr><td>${rel.date.toLocaleDateString()}</td>`
                            + Array(idx).fill("<td></td>").join("")
                            + `<td><span class='version-list__tag'>${rel.version}</span></td>`;
                            + Array(rest - 1).fill("<td></td>").join("")
                            + "</tr>";

                    return row;
                }).join("")
                + "</tbody></table>";

        document.querySelector(".version-list").innerHTML = html;
    });
