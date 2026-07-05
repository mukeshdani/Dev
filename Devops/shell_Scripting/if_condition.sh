
#!/bin/bash

Folder_path='/mnt/e/shell_scripting_Practice/'
file='how_date_time.sh'
full_path="${Folder_path}${file}"

if [ -f "$full_path" ]
then 
	echo "Yes, the $file is Exist"
else	
        echo "No, the $file in $Folder_path not exixt"

fi
