<template>
    <footer class="footer">
    	<div class="footer__item">
    		<nav class="vmenu">
    			<h2 class="vmenu__title">Help</h2>
    			<ul class="vmenu__list">
    				<li class="vmenu__item">
    					<router-link to="/docs/rules" class="vmenu__link">Rules</router-link>
    				</li>
    				<li class="vmenu__item">
    					<a href="https://github.com/MinisBett/ultimate-osu-server-switcher/releases/download/1.4/UltimateOsuServerSwitcher.exe" class="vmenu__link">Switcher</a>
    				</li>
    			
    			</ul>
    		</nav>
    	</div>
    	<div class="footer__item">
    		<nav class="vmenu">
    			<h2 class="vmenu__title">Social</h2>
    			<ul class="vmenu__list">
    				<li class="vmenu__item">
    					<a href="https://discord.gg/hG37Tz7" class="vmenu__link">Discord</a>
    				</li>
    			</ul>
    		</nav>
    	</div>
    	<div class="footer__item">
    		<nav class="vmenu">
    			<h2 class="vmenu__title">About Us</h2>
    			<ul class="vmenu__list">
    				<li class="vmenu__item">

						<a class="vmenu__link" href="https://github.com/osu-astellia/">Source code</a>
    				</li>
    			</ul>
    		</nav>
    	</div>
    	<div class="footer__item footer__title">
    		<h1>Astellia</h1>
    		<p>Unique osu!server</p>
    	</div>
    </footer>
</template>

<script>


    export default {
        name: "v-footer"
    }
</script>

<style scoped>
	.footer {
		margin-top: 30px;
		bottom: 0;
		padding: 40px 0;
		background-color: #21263E;
		display: flex;
		padding-left: 25%;
		width: 100%;
	}
	.footer__item {
		width: 15%;
		margin-right: -70px;
	}

	.footer__title {
		margin-top: -10px;
		margin-left: 325px;
	}

	.footer__title h1 {
		font-family: 'geoma_regular_demoregular';
		color: #FFFFFF;
	}
	.footer__title p {
		font-family: 'geoma_regular_demoregular';
		color: #FFFFFF;
	}
	.vmenu {
		
	}
	.vmenu__title {
		margin-top: 0;
		margin-bottom: 20px;
		text-align: left;
		font-size: 20px;
		line-height: 0.7;
		color: #FFFFFF;
		font-weight: 700;
		font-family: 'geoma_regular_demoregular';
		letter-spacing: 1.3px;
	}
	.vmenu__list {
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style-type: none;
		text-align: left;
		font-family: 'Cabin', sans-serif;
	}
	.vmenu__item {
		
	}
	.vmenu__link {
		color: rgba(255,255,255,0.8);
		transition: 0.4s;
	}
	.vmenu__link:hover {
		color: #FFFFFF;
	}
</style>