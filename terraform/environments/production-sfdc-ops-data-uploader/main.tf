 terraform {
  backend "s3" {
    bucket         = "terrafrom-state.deveron-ops"
    key            = "production-sfdc-ops-data-uploader/terraform.tfstate"
    region         = "us-east-1"
    profile        = "DVR"
  }
}


locals {
  base_name = "production-sfdc-ops-data-uploader"
  region = "us-east-1"
  profile = "DVR"
  base_description = "Production SFDC Ops Data Uploader"

  site_domain = "uploader.deveronapp.com"
  site_zone = "uploader.deveronapp.com"

  vpc_name = "deveronapp"

}


provider "aws" {
   region = local.region
   profile = local.profile
}



module "production-site" {
  source = "../../infrastructure/webs3-ssl"

  profile = local.profile

  dns_profile = local.profile
  site_domain = local.site_domain
  site_bucket_name = local.site_domain
  site_zone = local.site_zone
  site_default_root_object = "index.html"
}





