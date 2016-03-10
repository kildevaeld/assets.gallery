

export const PreviewTemplate =`
<div class="preview-region">
</div>
<div class="info-region">
</div>
`

export const PreviewInfoTemplate = `
<table>
		<tr>
			<td>Name</td>
			<td class="name"></td>
		</tr>
		<tr>
			<td>Mime</td>
			<td class="mime"></td>
		</tr>
		<tr>
			<td>Size</td>
			<td class="size"></td>
		</tr>
		<tr>
			<td>Download</td>
			<td class="download"><a></a></td>
		</tr>
	</table>
`

export const AssetListItemTemplate = `
<a class="assets-list-item-close-button"></a>
<div class="thumbnail-container">
	<i class="mime-type mime-unknown"></i>
</div>
<div class="name"></div>
`

export const gallery = `
<div class="gallery-list">
    
</div>
<div class="gallery-preview"></div>
<div class="gallery-upload">
    <label class="assets-button">
        <span>Upload</span>
        <input class="upload-button" style="display:none;" type="file" />
    </label>
</div>`