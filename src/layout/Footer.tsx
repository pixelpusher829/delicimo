const year = new Date().getFullYear();

const Footer = () => {
	return (
		<footer className="max-w-360 m-auto">
			<div className="flex justify-between p-6">
				<span>© {year} Delicimo</span>
				<span>Please hire me Medavie!🙏❤️</span>
				<span>Powered by Spoonacular API</span>
			</div>
		</footer>
	);
};

export default Footer;
