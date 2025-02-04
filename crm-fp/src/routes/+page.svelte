<script lang="ts">
	import { fingerprint } from '../../dist/index';
</script>

<h1>Welcome to crm-fp</h1>
<p>hash id: {fingerprint.id}</p>
<p>useragent: {JSON.stringify(fingerprint.useragent)}</p>
