/*jslint esnext:true, browser:true*/
/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static main() {
		var svg = window.app.appendChild(this.creerSvg());
		for (let i = 0; i < 100; i += 1) {
			let x = Math.floor(Math.random() * 1000);
			let y = Math.floor(Math.random() * 800);
			let blast = svg.appendChild(this.creerBlast());
			blast.setAttribute("transform", "translate(" + x + "," + y + ")");
			blast.setAttribute("fill", this.couleurAlea());
			//blast.setAttribute("stroke", "red");
		}
	}
	/**
	 * Retourne l'élément SVG à insérer dans le document
	 * @returns {SVGElement} Un dessin SVG
	 */
	static creerSvg() {
		var resultat = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		resultat.setAttribute("viewBox", "0 0 1000 800");
		resultat.setAttribute("width", "500");
		resultat.setAttribute("height", "400");
		var rect = resultat.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
		rect.setAttribute("width", "100%");
		rect.setAttribute("height", "100%");
		rect.setAttribute("fill", "hsl(240, 100%, 95%)");
		return resultat;
	}
	/**
	 * Retourne un élément SVG path en forme d'explosion
	 * @returns {SVGElement} Un objet path
	 */
	static creerBlast() {
		var resultat = document.createElementNS("http://www.w3.org/2000/svg", "path");
		var points = [];
		var taille = 100 * (Math.random() * 0.7 + 0.3);	//taille entre 30 et 100
		var pointes = 24;
		for (let i = 0; i < pointes * 2; i += 1) {
			let r = taille * (Math.random() + 1 + (i % 2)) / 3;	//rayon: dans le 2e tiers pour les creux et dans le 3e tier pour les pointes
			let x = r * Math.cos(i * Math.PI / pointes);
			let y = r * Math.sin(i * Math.PI / pointes);
			points.push(x + "," + y);
		}
		var d = "M " + points.join(" ") + "z";
		resultat.setAttribute("d", d);
		return resultat;
	}
	/**
	 * Retourne une couleur aléatoire rappelant le feu (dans les teintes de rouge)
	 * @returns {string} Une couleur au format hsla()
	 */
	static couleurAlea() {
		var h = 0 + Math.floor(Math.random() * 30) - 15;	//teinte (hue) entre -15 et 15 : rouge
		var s = Math.floor(Math.random() * 30) + 70;	//saturation entre 70 et 100
		var l = Math.floor(Math.random() * 50) + 20;	//luminosité entre 20 et 70
		var a = Math.random() * 0.5 + 0.5;	//alpha entre 0.5 et 1
		return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns {Promise} La promesse qui sera résolue après chargement
	 */
	static load() {
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();
			});
		});
	}
}
