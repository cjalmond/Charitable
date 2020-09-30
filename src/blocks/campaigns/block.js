/**
 * Block dependencies
 */
import { SettingsEditor } from './settings-editor.js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	Toolbar,
	ServerSideRender,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl,
	RangeControl,
	TextareaControl,
} = wp.components;
const {
	InspectorControls,
	BlockControls
} = wp.blockEditor;

/**
 * The campaigns block UI.
 */
class CharitableCampaignsBlock extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			editMode: false,
		};

		this.updateEditMode         = this.updateEditMode.bind( this );
		this.toggleMasonryLayout    = this.toggleMasonryLayout.bind( this );
		this.toggleResponsiveLayout = this.toggleResponsiveLayout.bind( this );
		this.toggleImage    				= this.toggleImage.bind( this );
		this.toggleDescription    	= this.toggleDescription.bind( this );
		this.toggleProgressBar    	= this.toggleProgressBar.bind( this );
		this.toggleAmountDonated    = this.toggleAmountDonated.bind( this );
		this.getInspectorControls   = this.getInspectorControls.bind( this );
		this.getToolbarControls     = this.getToolbarControls.bind( this );
		this.getSettingsEditor      = this.getSettingsEditor.bind( this );
		this.getPreview             = this.getPreview.bind( this );
	}

	/**
	 * Update edit mode in state.
	 */
	updateEditMode() {
		this.setState( {
			editMode: ! this.state.editMode
		} );
	}

	/**
	 * Turn the masonry layout on/off.
	 */
	toggleMasonryLayout() {
		const { masonryLayout } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { masonryLayout: ! masonryLayout } );
	}

	/**
	 * Turn responsive mode on/off.
	 */
	toggleResponsiveLayout() {
		const { responsiveLayout } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { responsiveLayout: ! responsiveLayout } );
	}

	/**
	 * Turn the Image on/off.
	 */
	toggleImage() {
		const { showImage } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { showImage: ! showImage } );
	}

	/**
	 * Turn the Description on/off.
	 */
	toggleDescription() {
		const { showDescription } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { showDescription: ! showDescription } );
	}

	/**
	 * Turn the Amount Donated on/off.
	 */
	toggleAmountDonated() {
		const { showAmountDonated } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { showAmountDonated: ! showAmountDonated } );
	}

	/**
	 * Turn the Progress Bar on/off.
	 */
	toggleProgressBar() {
		const { showProgressBar } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { showProgressBar: ! showProgressBar } );
	}


	/**
	 * Get the components for the sidebar settings area that is rendered while focused on a Donation Form block.
	 *
	 * @return Component
	 */
	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const { number, 
			orderBy, order, columns, masonryLayout, responsiveLayout, 
			imageSize, showImage, showDescription, showAmountDonated, 
			showProgressBar, progressBarStyle, customCSS } = attributes;

		const fullOrderBy = orderBy + '/' + order;

		return (
			<InspectorControls
				key="inspector"
				className="charitable-campaigns-inspector"
				description={ __( 'Configure', 'charitable' ) } >
				<PanelBody title={ __( 'Display Settings', 'charitable' ) }>
					<PanelRow>
						<SelectControl
							label={ __( 'Order by', 'charitable' ) }
							value={ fullOrderBy }
							options={ [
								{
									label: __( 'Date created (newest to oldest)', 'charitable' ),
									value: 'post_date/DESC',
								},
								{
									label: __( 'Date created (oldest to newest)', 'charitable' ),
									value: 'post_date/ASC',
								},
								{
									label: __( 'Amount donated', 'charitable' ),
									value: 'popular/DESC',
								},
								{
									label: __( 'Time left (least first)', 'charitable' ),
									value: 'ending/DESC',
								},
								{
									label: __( 'Time left (longest first)', 'charitable' ),
									value: 'ending/ASC',
								}
							] }
							onChange={ ( value ) => {
								const [ newOrderBy, newOrder ] = value.split( '/' );
								if ( newOrder !== order ) {
									setAttributes( { order: newOrder } );
								}
								if ( newOrderBy !== orderBy ) {
									setAttributes( { orderBy: newOrderBy } );
								}
							} }
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={ __( 'Number of campaigns', 'charitable' ) }
							value={ number }
							onChange={ ( value ) => setAttributes( { number: value } ) }
							min="-1"
							max="999"
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={ __( 'Columns', 'charitable' ) }
							value={ columns }
							min="1"
							max="4"
							onChange={ ( value ) => setAttributes( { columns: value } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Image', 'charitable' ) }
							checked={ showImage }
							onChange={ this.toggleImage }
						/>
					</PanelRow>
					{ showImage &&
						<PanelRow>
							<SelectControl
								label={ __( 'Thumbnail Size', 'charitable' ) }
								value={ imageSize }
								options={ [
									{
										label: __( 'Thumbnail', 'charitable' ),
										value: 'thumbnail',
									},
									{
										label: __( 'Medium', 'charitable' ),
										value: 'medium',
									},
									{
										label: __( 'Large', 'charitable' ),
										value: 'large',
									}
								] }
								onChange={ ( value ) => {
									setAttributes( { imageSize: value } );
								} }
							/>
						</PanelRow>
					}
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Description', 'charitable' ) }
							checked={ showDescription }
							onChange={ this.toggleDescription }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Amount Donated', 'charitable' ) }
							checked={ showAmountDonated }
							onChange={ this.toggleAmountDonated }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Progress Bar', 'charitable' ) }
							checked={ showProgressBar }
							onChange={ this.toggleProgressBar }
						/>
					</PanelRow>
					{ showProgressBar && 
						<PanelRow>
							<SelectControl
								label={ __( 'Progress Bar Style', 'charitable' ) }
								value={ progressBarStyle }
								options={ [
									{
										label: __( 'Bar', 'charitable' ),
										value: 'bar',
									},
									{
										label: __( 'Circle', 'charitable' ),
										value: 'circle',
									}
								] }
								onChange={ ( value ) => {
									setAttributes( { progressBarStyle: value } );
								} }
							/>
						</PanelRow>
					}
					<PanelRow>
						<ToggleControl
							label={ __( 'Masonry layout', 'charitable' ) }
							checked={ masonryLayout }
							onChange={ this.toggleMasonryLayout }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Responsive layout', 'charitable' ) }
							checked={ responsiveLayout }
							onChange={ this.toggleResponsiveLayout }
						/>
					</PanelRow>
					<PanelRow>
						<TextareaControl 
							label={ __( 'Custom CSS', 'charitable' ) }
							value={ customCSS }
							className="custom-css-textarea"
        			onChange={ (value) => {
								setAttributes( { customCSS: value } ) 
							} } />
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}

	/**
	 * Get the components for the toolbar area that appears on top of the block when focused.
	 *
	 * @return Component
	 */
	getToolbarControls() {
		const editButton = [
			{
				icon: 'filter',
				title: __( 'Filter Campaigns', 'charitable' ),
				onClick: this.updateEditMode,
				isActive: this.state.editMode,
			},
		];

		return (
			<BlockControls key="toolbar-controls">
				<Toolbar controls={ editButton } />
			</BlockControls>
		);
	}

	/**
	 * Get the block settings editor UI.
	 *
	 * @return Component
	 */
	getSettingsEditor() {
		return (
			<SettingsEditor { ...this.props } update_editMode={this.updateEditMode} key="settings-editor" />
		);
	}

	/**
	 * Get the block preview.
	 *
	 * @return Component
	 */
	getPreview() {
		return (
			<div className="charitable-block-campaigns has-preview" key="preview">
				<ServerSideRender
					block="charitable/campaigns"
					attributes={ this.props.attributes }
				/>
			</div>
		);
	}

	/**
	 * Render the block UI.
	 */
	render() {
		return [
			this.getInspectorControls(),
			this.getToolbarControls(),
			this.state.editMode ? this.getSettingsEditor() : this.getPreview()
		];
	}
}

export default CharitableCampaignsBlock;