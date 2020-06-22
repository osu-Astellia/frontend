<template>
    <footer class="footer">
    	<div class="footer__item">
    		<nav class="vmenu">
    			<h2 class="vmenu__title">Help</h2>
    			<ul class="vmenu__list">
    				<li class="vmenu__item">
    					<a href="" class="vmenu__link">Rules</a>
    				</li>
    				<li class="vmenu__item">
    					<a href="" class="vmenu__link">Download</a>
    				</li>
    				<li class="vmenu__item">
    					<a href="" class="vmenu__link">How To Connect</a>
    				</li>
    			</ul>
    		</nav>
    	</div>
    	<div class="footer__item">
    		<nav class="vmenu">
    			<h2 class="vmenu__title">Social</h2>
    			<ul class="vmenu__list">
    				<li class="vmenu__item">
    					<a href="" class="vmenu__link">Dsicord</a>
    				</li>
    			</ul>
    		</nav>
    	</div>
    	<div class="footer__item">
    		<nav class="vmenu">
    			<h2 class="vmenu__title">About Us</h2>
    			<ul class="vmenu__list">
    				<li class="vmenu__item">
    					<a href="" class="vmenu__link">Team</a>
    				</li>
    				<li class="vmenu__item">
    					<a href="" class="vmenu__link">Source Code</a>
    				</li>
    			</ul>
    		</nav>
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
		bottom: 0;
		padding: 40px 0;
		background-color: #21263E;
		display: flex;
		align-self:flex-end;
	}
	.footer__item {
		width: 30%;
		padding: 20px;
	}
	.footer__item:not(:last-child) {
		border-right: 1px solid rgba(255,255,255,0.6);
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
	}
	.vmenu__list {
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style-type: none;
		text-align: left;
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