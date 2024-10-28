# omnistudio-utils

This CLI allows you to perform tasks to rename OmniStudio components and remove special characters (mostly underscores) as part of your migration to Core and allow you to enable the Metadata API. After the renaming is done you can run additional commands to update cross references. 

Here is how the Unique Name is constructed :

| Component               | Object            | Fields That Create Unique Name  |
|-------------------------|-------------------|---------------------------------|
| Integration Procedures  | OmniProcess       | Type + Subtype                  |
| Omnistudio Data Mappers | OmniDataTransform | Name                            |
| Omniscripts             | OmniProcess       | Type + Subtype + Language       |
| Flexcards               | OmniUiCard        | Name                            |



All actions are performed locally based on content that is already downloaded using VBT / IDX. Once you are ready you can simply deploy the updated content into your Sandbox.

Please note that the CLI only supports Core Objects, assuming you have already migrated from Package into Core Objects for which you can use : https://www.npmjs.com/package/@salesforce/plugin-omnistudio-migration-tool

Disclaimer: This CLI is not an official module from Salesforce. It was created with the intent of distributing certain utility capabilities. Use it at your own risk.

Supported scenarios:

- Rename IntegrationProcedure
- Rename DataMappers
- Rename OmniScripts
- Rename FlexCards

- Update IntegrationProcedure references
    - In FlexCards
    - In OmniScripts
- Update DataMappers references
    - In FlexCards
    - In IntegrationProcedures
    - In OmniScript
- Update FlexCard references
    - In FlexCards, directly embedded
    - In OmniScripts
- Update OmniScript references
    - In Parent OmniScripts
    - In FlexCards

Patterns that are not supported yet: 

- References of OmniScripts or FlexCards within a Custom LWC (2nd level dependencies)
- References of FlexCards as Flyouts within another FlexCards.
- Set custom patterns for renaming. Currently all special characters and underscores are automatically removed.

## Install

    npm i @iivanov/omnistudio-utils

Note that you must install VBT/ IDX in order to export and deploy the updated content.

## Usage

The default source folder to be looked up is set to `./vlocity`. You can pass the folder to the command if your folder name is different.

Please note that you first need to execute the rename commands and then those to update references. Each Rename command will create a local JSON map file with the source and taret names to be used for the Reference commands. 


Rename IntegrationProcedures: 

```
npx omnistudio-command-exec rename-ip ./vlocity
```


Rename DataMappers: 

```
npx omnistudio-command-exec rename-dm ./vlocity
```

Rename FlexCards: 

```
npx omnistudio-command-exec rename-flex-cards ./vlocity
```

Rename OmniScripts: 

```
npx omnistudio-command-exec rename-omniscripts ./vlocity
```


Update DataMappers references: 

```
npx omnistudio-command-exec update-dm-references ./vlocity
```

Update IntegrationProcedure references: 

```
npx omnistudio-command-exec update-ip-references ./vlocity
```

Update FlexCards references: 

```
npx omnistudio-command-exec update-flex-cards-references ./vlocity
```

Update OmniScripts references: 

```
npx omnistudio-command-exec update-omniscripts-references ./vlocity
```

Once you are done, you can deploy to your target using VBT.