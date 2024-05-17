from pathlib import Path
from distutils.dir_util import copy_tree
from bs4 import BeautifulSoup
import re, os, json, shutil

# import configuration json
f = open("../buildConfig.json")
build_config = json.load(f)

# create build folder
Path("./build").mkdir(exist_ok=True)

# copy scripts, static, styles, configs
copy_tree("./scripts", "./build/scripts")
copy_tree("./styles", "./build/styles")
copy_tree("./static", "./build/static")
copy_tree("../configs", "./build/configs")

# copy custom css into build
shutil.copyfile("../custom.css", "./build/styles/custom.css")

# copy icon into build
shutil.copyfile("../" + build_config["iconPath"], "./build/static/icon.svg")

def ersetze_umlaute(string):
    string = string.replace("ae", "ä")
    string = string.replace("oe", "ö")
    string = string.replace("ue", "ü")
    string = string.replace("ss", "ß")
    return string

def translate_text(input_text, translation_dict, language_code, file_name):
    # Regular expression to find text within <translate></translate> tags
    translate_pattern = re.compile(r'<translate>(.*?)<\/translate>', re.DOTALL)

    def replace_translation(match):
        # Extract the text within <translate></translate> tags
        text_to_translate = match.group(1).strip()

        # Get the translation from the dictionary, defaulting to the original text if not found
        try:
            translation_from_dict = translation_dict[text_to_translate][language_code]
        except Exception as error:
            print("localization error in file: " + file_name)
            raise error 


        translation = translation_from_dict
 
        return f'<translate>{translation}</translate>'

    # Use re.sub to replace the text within <translate></translate> tags with translations
    output_text = translate_pattern.sub(replace_translation, input_text)

    return output_text


for language_code in build_config["availableLanguages"]:
    # create directories to save all modified files
    f = open("../" + build_config["contentTemplatesPath"] + "localization.json")
    general_localization = json.load(f)

    Path("./build/" + language_code + "/" + general_localization[language_code]).mkdir(parents=True, exist_ok=True)


    # insert every file content into template
    with open("./template.html", 'r') as infile:
        content = infile.read()

        # go to folder configurated in build config
        for page_path in os.listdir("../" + build_config["contentTemplatesPath"]):
            if page_path.split(".")[1] == 'html':
                page_name = os.path.basename(page_path)

                # open page content
                with open("../" + build_config["contentTemplatesPath"] + page_path, 'r') as page_infile:
                    page_content = page_infile.read()
                    active_page_title = page_name.split(".")[0][3:]


                    # fill content with translated text
                    t = open("../" + build_config["contentTemplatesPath"] + page_path.split(".")[0] + "_localization.json")
                    translation_dict = json.load(t)
                    page_content = translate_text(page_content, translation_dict, language_code, "../" + build_config["contentTemplatesPath"] + page_path.split(".")[0] + "_localization.json")

                    content_copy = content

                    # insert content language
                    content_copy = re.sub('builder-content-language', language_code, content_copy)

                    # insert content description
                    description = ersetze_umlaute(translation_dict["description"][language_code])
                    content_copy = re.sub('builder-content-description', description, content_copy)

                    # insert content keywords
                    keywords = ersetze_umlaute(active_page_title.capitalize()) + ', ' + ersetze_umlaute(translation_dict["keywords"][language_code])
                    content_copy = re.sub('builder-content-keywords', keywords, content_copy)

                    # insert title
                    content_copy = re.sub('<builder-title></builder-title>', general_localization["title"][language_code] + " | " + ersetze_umlaute(translation_dict["filename"][language_code].capitalize()), content_copy)

                    # insert header
                    content_copy = re.sub('<builder-header></builder-header>', build_config["header"], content_copy)

                    # insert sub header
                    content_copy = re.sub('<builder-sub-header></builder-sub-header>', build_config["subHeader"], content_copy)

                    # insert localization options
                    localization_content = ''
                    for available_language_code in build_config["availableLanguages"]:
                        if available_language_code != language_code:
                            localization_content += f'<button onclick="window.location.href=\'file:///Users/lars/Documents/GitRepos/Grammatikson/minimalist/build/{available_language_code}/{general_localization[available_language_code]}/{translation_dict["filename"][available_language_code]}.html\';"><span class="header-button">{available_language_code.upper()}</span></button>'

                    content_copy = re.sub('<language-selector-content></language-selector-content>', f'{localization_content}', content_copy)

                    # insert content into template
                    content_copy = re.sub('<builder-content></builder-content>', f'{page_content}', content_copy)

                    nav_html = ""


                    
                    file_list = os.listdir("../" + build_config["contentTemplatesPath"])
                    file_list = [path for path in file_list if path.endswith('.html')] # this removes localization files
                    sortedList = sorted(file_list)

                    for page in sortedList:
                        page_name_of_list = os.path.basename(page)[3:].split(".")[0]

                        t = open("../" + build_config["contentTemplatesPath"] + page.split(".")[0] + "_localization.json")
                        translation_dict_of_list = json.load(t)

                        if(page_name_of_list not in build_config["navigationBlacklist"]):
                            print(page_name_of_list.capitalize() + " : " + page_name.split("_")[1])
                            if page_name_of_list != page_name.split("_")[1].split(".")[0]:
                                nav_html = nav_html + f'\n<a class="navigationElement" href="/en/swedish/{translation_dict_of_list["filename"][language_code]}.html">{ersetze_umlaute(translation_dict_of_list["filename"][language_code].capitalize())}</a>'
                            else:
                                nav_html = nav_html + f'\n<a class="navigationElement active" href="/en/swedish/{translation_dict_of_list["filename"][language_code]}.html" id="_nav" onclick="onSideNavigationLinkClicked(_nav)">{ersetze_umlaute(translation_dict_of_list["filename"][language_code].capitalize())}</a>'
                        else:
                            content_copy = re.sub('<builder-header-tags></builder-header-tags>', '<meta name="robots" content="noindex, nofollow">', content_copy)


                    content_copy = re.sub('<builder-nav></builder-nav>', f'{nav_html}', content_copy)

                    # safe as new file
                    translated_filename = translation_dict["filename"][language_code]

                    with open(f'./build/{language_code}/{general_localization[language_code]}/{translated_filename}.html', 'w') as outfile:
                        outfile.write(content_copy)

