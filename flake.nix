{
  description = "Sleepr project's flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = (import (nixpkgs) { inherit system; });
        gdk = pkgs.google-cloud-sdk.withExtraComponents (
          with pkgs.google-cloud-sdk.components; [
            gke-gcloud-auth-plugin
          ]
        );
        helm = pkgs.wrapHelm pkgs.kubernetes-helm {
          plugins = with pkgs.kubernetes-helmPlugins; [
            helm-diff
            helm-secrets
            helm-s3
          ];
        };
      in {
        devShell = pkgs.mkShell {
	        buildInputs = with pkgs; [
            awscli
            nest-cli
            nodejs_22
            pnpm
            gdk
            helm
          ];
        };
      }
    );
}
